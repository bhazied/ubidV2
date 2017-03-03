<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\FaqCategory;
use ContinuousNet\BiodyXpertBundle\Form\FaqCategoryType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Faq Category Controller
 * 
 * Manage FaqCategories 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		FaqCategoryController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/faqcategory")
 */
class FaqCategoryController extends BaseController
{
	/**
	 * Lists all FaqCategory entities.
	 *
	 * @Route("/", name="faqcategory_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$faqCategories = $em->getRepository('BiodyXpertBundle:FaqCategory')->findAll();

		return $this->render('BiodyXpertBundle:FaqCategory:index.html.twig', array(
			'faqCategories' => $faqCategories,
		));
	}

	/**
	 * Creates a new FaqCategory entity.
	 *
	 * @Route("/new", name="faqcategory_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$faqCategory = new FaqCategory();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\FaqCategoryType', $faqCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($faqCategory);
			$em->flush();

			return $this->redirectToRoute('faqcategory_show', array('id' => $faqCategory->getId()));
		}

		return $this->render('BiodyXpertBundle:FaqCategory:new.html.twig', array(
			'faqCategory' => $faqCategory,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a FaqCategory entity.
	 *
	 * @Route("/{id}", name="faqcategory_show")
	 * @Method("GET")
	 */
	public function showAction(FaqCategory $faqCategory)
	{
		$deleteForm = $this->createDeleteForm($faqCategory);

		return $this->render('BiodyXpertBundle:FaqCategory:show.html.twig', array(
			'faqCategory' => $faqCategory,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing FaqCategory entity.
	 *
	 * @Route("/{id}/edit", name="faqcategory_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, FaqCategory $faqCategory)
	{
		$deleteForm = $this->createDeleteForm($faqCategory);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\FaqCategoryType', $faqCategory);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($faqCategory);
			$em->flush();

			return $this->redirectToRoute('faqcategory_edit', array('id' => $faqCategory->getId()));
		}

		return $this->render('BiodyXpertBundle:FaqCategory:edit.html.twig', array(
			'faqCategory' => $faqCategory,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a FaqCategory entity.
	 *
	 * @Route("/{id}", name="faqcategory_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, FaqCategory $faqCategory)
	{
		$form = $this->createDeleteForm($faqCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($faqCategory);
			$em->flush();
		}

		return $this->redirectToRoute('faqcategory_index');
	}

	/**
	 * Creates a form to delete a FaqCategory entity.
	 *
	 * @param FaqCategory $faqCategory The FaqCategory entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(FaqCategory $faqCategory)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('faqcategory_delete', array('id' => $faqCategory->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
