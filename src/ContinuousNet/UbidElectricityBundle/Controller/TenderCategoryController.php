<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TenderCategory;
use ContinuousNet\UbidElectricityBundle\Form\TenderCategoryType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Tender Category Controller
 * 
 * Manage TenderCategories 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		TenderCategoryController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/tendercategory")
 */
class TenderCategoryController extends BaseController
{
	/**
	 * Lists all TenderCategory entities.
	 *
	 * @Route("/", name="tendercategory_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$tenderCategories = $em->getRepository('UbidElectricityBundle:TenderCategory')->findAll();

		return $this->render('UbidElectricityBundle:TenderCategory:index.html.twig', array(
			'tenderCategories' => $tenderCategories,
		));
	}

	/**
	 * Creates a new TenderCategory entity.
	 *
	 * @Route("/new", name="tendercategory_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$tenderCategory = new TenderCategory();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TenderCategoryType', $tenderCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($tenderCategory);
			$em->flush();

			return $this->redirectToRoute('tendercategory_show', array('id' => $tenderCategory->getId()));
		}

		return $this->render('UbidElectricityBundle:TenderCategory:new.html.twig', array(
			'tenderCategory' => $tenderCategory,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TenderCategory entity.
	 *
	 * @Route("/{id}", name="tendercategory_show")
	 * @Method("GET")
	 */
	public function showAction(TenderCategory $tenderCategory)
	{
		$deleteForm = $this->createDeleteForm($tenderCategory);

		return $this->render('UbidElectricityBundle:TenderCategory:show.html.twig', array(
			'tenderCategory' => $tenderCategory,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TenderCategory entity.
	 *
	 * @Route("/{id}/edit", name="tendercategory_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TenderCategory $tenderCategory)
	{
		$deleteForm = $this->createDeleteForm($tenderCategory);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TenderCategoryType', $tenderCategory);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($tenderCategory);
			$em->flush();

			return $this->redirectToRoute('tendercategory_edit', array('id' => $tenderCategory->getId()));
		}

		return $this->render('UbidElectricityBundle:TenderCategory:edit.html.twig', array(
			'tenderCategory' => $tenderCategory,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TenderCategory entity.
	 *
	 * @Route("/{id}", name="tendercategory_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TenderCategory $tenderCategory)
	{
		$form = $this->createDeleteForm($tenderCategory);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($tenderCategory);
			$em->flush();
		}

		return $this->redirectToRoute('tendercategory_index');
	}

	/**
	 * Creates a form to delete a TenderCategory entity.
	 *
	 * @param TenderCategory $tenderCategory The TenderCategory entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TenderCategory $tenderCategory)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('tendercategory_delete', array('id' => $tenderCategory->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
