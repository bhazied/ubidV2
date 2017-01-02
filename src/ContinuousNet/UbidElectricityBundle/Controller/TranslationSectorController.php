<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationSector;
use ContinuousNet\UbidElectricityBundle\Form\TranslationSectorType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Sector Controller
 * 
 * Manage TranslationSectors 
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
 * @see		TranslationSectorController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationsector")
 */
class TranslationSectorController extends BaseController
{
	/**
	 * Lists all TranslationSector entities.
	 *
	 * @Route("/", name="translationsector_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationSectors = $em->getRepository('UbidElectricityBundle:TranslationSector')->findAll();

		return $this->render('UbidElectricityBundle:TranslationSector:index.html.twig', array(
			'translationSectors' => $translationSectors,
		));
	}

	/**
	 * Creates a new TranslationSector entity.
	 *
	 * @Route("/new", name="translationsector_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationSector = new TranslationSector();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationSectorType', $translationSector);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationSector);
			$em->flush();

			return $this->redirectToRoute('translationsector_show', array('id' => $translationSector->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationSector:new.html.twig', array(
			'translationSector' => $translationSector,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationSector entity.
	 *
	 * @Route("/{id}", name="translationsector_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationSector $translationSector)
	{
		$deleteForm = $this->createDeleteForm($translationSector);

		return $this->render('UbidElectricityBundle:TranslationSector:show.html.twig', array(
			'translationSector' => $translationSector,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationSector entity.
	 *
	 * @Route("/{id}/edit", name="translationsector_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationSector $translationSector)
	{
		$deleteForm = $this->createDeleteForm($translationSector);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationSectorType', $translationSector);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationSector);
			$em->flush();

			return $this->redirectToRoute('translationsector_edit', array('id' => $translationSector->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationSector:edit.html.twig', array(
			'translationSector' => $translationSector,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationSector entity.
	 *
	 * @Route("/{id}", name="translationsector_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationSector $translationSector)
	{
		$form = $this->createDeleteForm($translationSector);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationSector);
			$em->flush();
		}

		return $this->redirectToRoute('translationsector_index');
	}

	/**
	 * Creates a form to delete a TranslationSector entity.
	 *
	 * @param TranslationSector $translationSector The TranslationSector entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationSector $translationSector)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationsector_delete', array('id' => $translationSector->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
