<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationMenuLink;
use ContinuousNet\UbidElectricityBundle\Form\TranslationMenuLinkType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Menu Link Controller
 * 
 * Manage TranslationMenuLinks 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		TranslationMenuLinkController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationmenulink")
 */
class TranslationMenuLinkController extends BaseController
{
	/**
	 * Lists all TranslationMenuLink entities.
	 *
	 * @Route("/", name="translationmenulink_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationMenuLinks = $em->getRepository('UbidElectricityBundle:TranslationMenuLink')->findAll();

		return $this->render('UbidElectricityBundle:TranslationMenuLink:index.html.twig', array(
			'translationMenuLinks' => $translationMenuLinks,
		));
	}

	/**
	 * Creates a new TranslationMenuLink entity.
	 *
	 * @Route("/new", name="translationmenulink_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationMenuLink = new TranslationMenuLink();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationMenuLinkType', $translationMenuLink);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationMenuLink);
			$em->flush();

			return $this->redirectToRoute('translationmenulink_show', array('id' => $translationMenuLink->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationMenuLink:new.html.twig', array(
			'translationMenuLink' => $translationMenuLink,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationMenuLink entity.
	 *
	 * @Route("/{id}", name="translationmenulink_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationMenuLink $translationMenuLink)
	{
		$deleteForm = $this->createDeleteForm($translationMenuLink);

		return $this->render('UbidElectricityBundle:TranslationMenuLink:show.html.twig', array(
			'translationMenuLink' => $translationMenuLink,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationMenuLink entity.
	 *
	 * @Route("/{id}/edit", name="translationmenulink_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationMenuLink $translationMenuLink)
	{
		$deleteForm = $this->createDeleteForm($translationMenuLink);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationMenuLinkType', $translationMenuLink);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationMenuLink);
			$em->flush();

			return $this->redirectToRoute('translationmenulink_edit', array('id' => $translationMenuLink->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationMenuLink:edit.html.twig', array(
			'translationMenuLink' => $translationMenuLink,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationMenuLink entity.
	 *
	 * @Route("/{id}", name="translationmenulink_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationMenuLink $translationMenuLink)
	{
		$form = $this->createDeleteForm($translationMenuLink);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationMenuLink);
			$em->flush();
		}

		return $this->redirectToRoute('translationmenulink_index');
	}

	/**
	 * Creates a form to delete a TranslationMenuLink entity.
	 *
	 * @param TranslationMenuLink $translationMenuLink The TranslationMenuLink entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationMenuLink $translationMenuLink)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationmenulink_delete', array('id' => $translationMenuLink->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
